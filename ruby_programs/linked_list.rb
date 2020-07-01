class Node
    attr_accessor :value, :next
    def initialize(value=nil,point=nil)
        @value=value
        @next=point
    end
end

class LinkedList
    def initialize
        @list=[]
    end

    def append(value)
        if @list.any?
            self.tail.next=value
            val=Node.new(value)
            @list.append(val)
        else
            val=Node.new(value)
            @list.append(val)
        end        
    end

    def prepend(value)
        if @list.any?
            val=Node.new(value,self.head.value)
            @list.unshift(val)
        end    
    end

    def size
        @list.length
    end

    def head
        @list[0]
    end

    def tail
        @list[@list.length-1]
    end

    def at(index)
        @list[index]
    end

    def pop
        @list.pop
        self.tail.next=nil
        @list
    end

    def contains?(value)
        for i in 0...@list.length
            if @list[i].value==value
                return true
            end
        end
        return false 
    end

    def find(value)
        if self.contains?(value)
            for i in 0..@list.length
                if @list[i].value==value
                    return i
                end
            end
        else
            return nil
        end
    end

    def to_s
        str= @list.map do |ele|
            "( #{ele.value} ) ->"
        end
        str.append("( nil )")
        str.join(" ")
    end

    def insert_at(value, index)
        if index<@list.length-1
            @list=@list[0...index].concat(@list[index...@list.length].unshift(Node.new(value)))
            @list[index].next=@list[index+1].value
            if index>0
              @list[index-1].next=value
            end
            @list
        elsif index==@list.length-1
            self.append(value)
        end
      end

    def remove_at(index)
        if index<@list.length-1 && index>0
            @list[index-1].next=@list[index+1].value
            @list=@list[0...index].concat(@list[index...@list.length].drop(1))
            @list
        elsif index==0
            @list.drop(1)
        elsif index==@list.length-1
            self.pop
        end
        
    end
        
end

