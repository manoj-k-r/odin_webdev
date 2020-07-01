class Move
    attr_accessor :coord, :previous
    def initialize(coord,previous=nil)
        @coord=coord
        @previous=previous
    end
end

  def children(node)
    result=[]
    for i in possible_moves
      new_coord=[node.coord[0]+i[0],node.coord[1]+(i[1])]
      if chess.include?(new_coord) 
        result.append(new_coord)
      end
    end
    child_nodes=result.map do |child|
        Move.new(child,node)
    end
    child_nodes
  end

  def chess
    board=[]
    for i in 0...8
      for j in 0...8
        board.append([i,j])
      end
    end
      board
  end

  def possible_moves
    [[2,1],[-2,1],[2,-1],[-2,-1],[1,2],[-1,2],[1,-2],[-1,-2]]
  end

  def knight_moves(coord1,coord2,queue=[],visited=[])
    if !chess.include?(coord1) || !chess.include?(coord2)
      return "Invalid coordinate found. Choose between [0,0] and [7,7]"
    end
    if visited==[]
      queue.append(Move.new(coord1))
    end
    first=queue.shift
    if first.coord==coord2
      return display_path(first)
    elsif !visited.include?first.coord
        visited.append(first.coord)
        knight_moves(coord1,coord2,queue+children(first),visited)
    else
      knight_moves(coord1,coord2,queue,visited)
    end
  end

  def display_path(move, result=[])
    if move==nil
      path=result.reverse
      puts "You need #{path.length-1} moves. The moves are:\n"
      for i in path
       p i
      end
    else
      previous=move.previous
      coords=move.coord
      result.append(coords)
      display_path(previous, result)    
    end
  end


knight_moves([0,0],[1,1])
      


 







