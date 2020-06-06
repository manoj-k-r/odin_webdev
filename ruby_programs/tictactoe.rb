#A Game of Tic Tac Toe on Ruby!
class Board
    attr_reader :board
    
    def initialize
        @board=(1..9).to_a
        display_board(@board)
    end
    def display_board(board)
        puts "#{board[0]} | #{board[1]} | #{board[2]}"
        puts "--+---+--"
        puts "#{board[3]} | #{board[4]} | #{board[5]}"
        puts "--+---+--"
        puts "#{board[6]} | #{board[7]} | #{board[8]}"
    end

    def change_board(coord, symbol, board)
        @board[coord.to_i-1]=symbol
        display_board(@board)
    end

    def win?
        if (@board[0]==@board[1] && @board[1]==@board[2]) || (@board[0]==@board[4] && @board[8]==@board[4]) || (@board[0]==@board[3] && @board[3]==@board[6]) || (@board[1]==@board[4] && @board[4]==@board[7]) || (@board[2]==@board[5] && @board[5]==@board[8]) || (@board[3]==@board[4] && @board[4]==@board[5]) || (@board[6]==@board[7] && @board[7]==@board[8]) || (@board[2]==@board[4] && @board[4]==@board[6])
            true
        else
            false
        end
    end

    def valid(coord) 
        if  !(1..9).to_a.include?(coord.to_i)
            1
        elsif ["X","O"].include?(@board[coord.to_i-1])
            -1
        else 
            0
        end
    end

    def draw?
        @board.all? {|entry| entry.to_i==0}
    end


end


class Player
    attr_reader :name, :symbol
    def initialize(name, symbol)
        @name=name
        @symbol=symbol
    end

end

class Game
    def initialize
        puts "Welcome to a game of Tic Tac Toe"
        puts "Player 1, enter your name: "
        @p1n= gets.chomp
        puts "#{@p1n}, Do you want X or O?"
        @p1s= gets.chomp
        while @p1s!="X" && @p1s!="O" do
            puts "Choose X or O please!"
            @p1s=gets.chomp
        end
        puts "Hi #{@p1n}! Your symbol is #{@p1s}."
        @p1=Player.new(@p1n,@p1s)
        puts "Player 2, enter your name: "
        @p2n=gets.chomp
        if @p1s=="X"
            @p2s="O"
        else
            @p2s="X"
        end
        @p2=Player.new(@p2n,@p2s)
        puts "Hi #{@p2n}! Your symbol is #{@p2s}."
        new_game()
    end

    def player_entry(player)
        puts "#{player.name}, enter a number on the grid:"
        c=gets.chomp
        while @game_board.valid(c)!=0
            if @game_board.valid(c)==1 
                puts "Invalid entry. Try again."
                c=gets.chomp
            else
                puts "There's already an entry at #{c}. Choose an empty spot on the gird."
                c=gets.chomp
            end
        end
        @game_board.change_board(c, player.symbol, @game_board.board)
    end

    def new_game
        @game_board=Board.new()
    end

    def restart
        puts "Wanna play another game? Y/N"
        decision=gets.chomp
        while decision!="Y" && decision!="N"
            puts "Please enter Y/N"
            decision=gets.chomp
        end
        if decision=="Y"
            Game.new().play_game()
        else
            puts "Thanks for playing!"
            return

        end
    end


    def play_game()
        while !@game_board.win? && !@game_board.draw?
            player_entry(@p1)
            if !@game_board.win? && !@game_board.draw?
                player_entry(@p2)
            elsif @game_board.draw?
                puts "It's a draw"
                restart()
                exit
            else
                puts "#{@p1.name} is the winner!"
                restart() 
                exit
            end
        end
        if @game_board.draw?
            puts "It's a draw"
            restart()
            exit
        else
            puts "#{@p2.name} is the winner!"
            restart()
            exit
        end
    end
end

Game.new().play_game()

        



