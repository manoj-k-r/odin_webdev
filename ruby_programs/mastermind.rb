#Mastermind game with ruby
class Game
    def initialize 
        puts "The Machines have taken over the planet. You are part of a small group of survivors trying to fight them off.
        You are a codemaster. Your job is to make coded messages for other survivors and break ongoing coded transmissions between the machines.
        The codes contain four letters from the word 'enigma' (all lowercase; letters can be repeated; letter can be in any order) . Should you choose to be a code breaker, a reprogammed machine will assist you by providing hints based on your guesses. These hints contain #{"●".green} if your message contains the right letter at the right position and #{"●".white} if you have a letter at the wrong position. 
        Unfortunately, the machines have similar devices as well. So good luck making codes that are hard to crack. 
        Do you want to make or break code? (1-Make Code, 2-Break Code)" 
        choice=gets.chomp
        while choice.to_i!=1 && choice.to_i!=2 do
            puts "Invald entry. Choose 1 or 2"
            choice=gets.chomp
        end
        if choice.to_i==1
            PlayerSet.new()
    
        else
            ComputerSet.new()
        end
        restart()
    end
    def restart
        puts "Do you want to go again? Y/N"
        choice=gets.chomp
        while choice!="Y" && choice!="N"
          puts "Invalid entry. Please type Y/N"
          choice=gets.chomp
        end
        if choice=="Y"
          Game.new()
        else
          return
        end     
    end        
end

class Analyzer
    def valid?(guess)
        @letters_arr= ["e","n","i","g","m","a"]
        if guess.length==4 && guess.split("").all? {|letter| @letters_arr.include?(letter)}
            true
        else
            false
        end
    end

    def analyze_guess(guess,code)
        @guess_arr=guess.split("")
        @code_arr=code.split("")
        correct=0
        incorrect=0
        for i in 0..3
            if @guess_arr[i]==@code_arr[i]
                correct+=1
                @code_arr[@code_arr.index(@guess_arr[i])]="#" #dummy letter
                @guess_arr[i]="*" #dummy letter
            end
        end
        for i in 0..3
            if @code_arr.include?(@guess_arr[i])
                @code_arr[@code_arr.index(@guess_arr[i])]="#" #dummy letter
                incorrect+=1     
            end
        end
        hints(correct,incorrect)
    end

    def hints(correct,incorrect)
        clues_arr=Array.new
        if correct>0
            for i in 1..correct
                clues_arr.push("●".green)
            end
        end
        if incorrect>0
            for i in 1..incorrect
                clues_arr.push("●".white)
            end
        end
        clues_arr.join(" ")

    end
end



class PlayerSet < Analyzer
    def initialize
        "Make a four letter code containing the characters e,n,i,g,m,a. Lets see if the machines can guess it \n".each_char {|char| putc char; sleep 0.05}
        @code=gets.chomp
        while !valid?(@code) do
            "Invalid code. Try again. \n".each_char {|char| putc char; sleep 0.05}
            @code=gets.chomp
        end
        "Sending Transmission........ \n".each_char {|char| putc char; sleep 0.05}
        "A Machine has picked up your transmission........ \n".each_char {|char| putc char; sleep 0.05}
        ComputerBreak.new(@code)
    end
end


class ComputerSet
    def initialize
        @letters_arr= ["e","n","i","g","m","a"]
        @code_arr= Array.new(4).map do |letter|
            @letters_arr[rand(6)]
        end
        @code=@code_arr.join("")
        "....Picking up enemy transmission \n".each_char {|char| putc char; sleep 0.05}
        "We have a coded message. It contains 4 letters from the set (e,n,i,g,m,a). Break it. \n".each_char {|char| putc char; sleep 0.05}
        guess=gets.chomp
        PlayerBreak.new(@code,guess)
    end
end

class String #colors
    def green;          "\e[32m#{self}\e[0m" end
    def white;           "\e[37m#{self}\e[0m" end
end


class PlayerBreak < Analyzer
    
    def initialize(code,guess)
        @guess_no=1
        while !valid?(guess) do
            "Invalid. Enter a valid guess \n".each_char {|char| putc char; sleep 0.05}
            guess=gets.chomp
        end
        "Guess ##{@guess_no} You guessed: #{guess}. \n".each_char {|char| putc char; sleep 0.05} 
        puts "#{analyze_guess(guess,code)}"
        while guess!=code do
            "Make another guess. \n".each_char {|char| putc char; sleep 0.05}
            guess=gets.chomp
            while !valid?(guess) do
                "Invalid. Enter a valid guess \n".each_char {|char| putc char; sleep 0.05}
                guess=gets.chomp
            end
            @guess_no+=1
            "Guess ##{@guess_no} You guessed: #{guess}. \n".each_char {|char| putc char; sleep 0.05} 
            puts "#{analyze_guess(guess,code)}"
        end
        "You have broken enemy code in #{@guess_no} guesses. \n".each_char {|char| putc char; sleep 0.05} 
    end
end

class ComputerBreak < Analyzer
    def initialize(code)
        @guess_no=1
        @letters_arr= ["e","n","i","g","m","a"]
        @guess_set=@letters_arr.repeated_permutation(4).map(&:join)
        @guess=@guess_set.sample
        @correct_hint=Array.new(4).map do |ele|
            "●".green
        end.join(" ")
        while analyze_guess(@guess,code)!=@correct_hint do
            "Guess ##{@guess_no} Machine guessed #{@guess} \n".each_char {|char| putc char; sleep 0.05}
            puts "#{analyze_guess(@guess,code)} \n"
            @guess_no+=1
            @guess=pruned_set(@guess,code).sample
        end
        "Guess ##{@guess_no} Machine guessed #{@guess} \n".each_char {|char| putc char; sleep 0.05}
        puts "#{analyze_guess(@guess,code)} \n"
        "The Machines have cracked your code in #{@guess_no} guesses. The code was #{@guess}. \n".each_char {|char| putc char; sleep 0.05}
    end

    def pruned_set(guess,code)
        @guess_set-=[@guess]
        @guess_set=@guess_set.reduce([]) do |new_arr, string|
            if analyze_guess(guess,string)==analyze_guess(guess,code)
                new_arr.push(string)
            end
            new_arr
        end
        @guess_set
    end
end
Game.new()




