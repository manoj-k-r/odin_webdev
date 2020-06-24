require 'csv'
require 'json'
class Game
    def initialize(word='',dash_arr=[],rem_letters=[],wrong_guess=0,loaded=false)
        @@alpha_arr=Array.new
        for i in 97..122
            @@alpha_arr.push(i.chr)
        end
        if loaded==false
            puts "Welcome to a game of Hangman. Do you want to load an existing game? Y/N"
            choice=gets.chomp
            while choice!='Y' && choice!='N'
                puts "Invalid entry"
                choice=gets.chomp
            end
            if choice=='Y'
                puts "Enter File name"
                file=gets.chomp
                load_game(file)
            else 
                words=IO.readlines('word_list.txt', chomp: true)
                @rand_word=words[rand(words.length)].downcase
                dash="_"        
                for i in 0...@rand_word.length
                    dash_arr.append(dash)
                end
                @rem_letters=@@alpha_arr.dup
                puts File.read("hangmen/h#{wrong_guess}.txt")
                play_game(dash_arr,wrong_guess)   
            end  
        else
            @rand_word=word
            @rem_letters=rem_letters
            puts File.read("hangmen/h#{wrong_guess}.txt")
            play_game(dash_arr,wrong_guess) 
        end

    end

    def play_game(dash_arr,wrong_guess)
        puts dash_arr.join(' ')
        puts "You have #{6-wrong_guess} guesses.Type a letter (case insensitive).Type * to save the game."
        letter=gets.chomp
        if letter=='*'
            puts "Enter a name for this saved game"
            name=gets.chomp
            save_file(name,@rand_word,dash_arr,@rem_letters,wrong_guess)
            puts "Do you want to quit? Y/N"
            choice=gets.chomp
            while choice!='Y' && choice!='N'
                puts "Invalid entry"
                choice=gets.chomp
            end
            if choice=='Y'
                puts "Thanks for playing. Catch you later!"
            else
                play_game(dash_arr,wrong_guess)
            end
        else
            letter=check_letter(letter)
            @rem_letters.delete(letter)
            if !@rand_word.include?(letter.downcase)
                puts "Worng letter. Try again"
                wrong_guess+=1
                puts File.read("hangmen/h#{wrong_guess}.txt")
                if wrong_guess==6
                    puts "GAME OVER"
                else
                    play_game(dash_arr,wrong_guess)
                end
            else
                puts "You guessed a correct letter"
                if reveal_letter(letter,dash_arr).join('')==@rand_word
                    puts reveal_letter(letter,dash_arr).join(' ')
                    puts "Congrats you've found the word!"
                else
                    play_game(reveal_letter(letter,dash_arr),wrong_guess)
                end
            end
        end
        
        
    end

    def check_letter(letter)
        while !@@alpha_arr.include?letter.downcase || letter.length!=1
            puts "Invalid entry. Enter only letters."
            letter=gets.chomp
        end
        while !@rem_letters.include?letter.downcase
            puts "You've already tried this. Choose another letter."
            letter=gets.chomp
        end
        return letter
    end

    def reveal_letter(letter,dash_arr)
        i=0
        temp_rand=@rand_word.gsub(letter.downcase,'*')   
        new_arr=dash_arr.map do |dash|
            if temp_rand.split('')[i]=='*'
                i+=1
                letter.downcase
            else
                i+=1
                dash
            end
        end
        return new_arr
    end

    def to_json(word,dash_arr,rem_letters,guesses)
        JSON.dump ({
            :word => word,
            :dash_arr => dash_arr,
            :rem_letters => rem_letters,
            :guesses => guesses
        })
    end

    def save_file(file_name,word,dash_arr,rem_letters,guesses)
        csv=CSV.read "saved_files.csv"
        csv.each do |line|
            if line[0]==file_name
                puts "File with this name already exists. Choose a new name."
                file=gets.chomp
                save_file(file,word,dash_arr,rem_letters,guesses)
            end
        end
        CSV.open("saved_files.csv", "a+") do |row| 
            row<< [file_name,to_json(word,dash_arr,rem_letters,guesses)]
        end 
    end    

    def load_game(file)
        csv=CSV.read "saved_files.csv"
        csv.each do |line|
            if line[0]==file
                data=JSON.load line[1]
                puts "Loading game...."
                Game.new(data['word'],data['dash_arr'],data['rem_letters'],data['guesses'],loaded=true)
                exit
            end
        end
        puts "Game not found. Starting a new game..."
        Game.new()
    end
end

Game.new()
