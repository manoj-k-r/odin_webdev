class Node
    attr_accessor :value, :left, :right
    def initialize(value,left=nil,right=nil)
        @value=value
        @left=left
        @right=right
    end

    def <=>(other)
        @value<=>other.value
    end
end

class Tree
    def initialize(array)
        @root=build_tree(array)
    end

    def build_tree(array)
            array=array.sort.uniq
            if array.length==0
              return
            else
              node=Node.new(array[array.length/2])
              right=array[array.length/2+1...array.length]
              left=array[0...array.length/2]
              node.left=build_tree(left)
              node.right=build_tree(right)
              node
            end
    end

    def insert(value,node=@root)
        case node.value<=>value
        when -1
            node.right ? insert(value,node.right) : node.right=Node.new(value)
        when 0
            puts "Duplicate"
        when 1
            node.left ? insert(value,node.left) : node.left=Node.new(value)
        end
    end

    def find(value,node=@root)
        case node.value<=>value
        when -1
            if !node.right
                nil
            end
            find(value,node.right)
        when 0
            node
        when 1
            if !node.left
                nil
            end
            find(value,node.left)
        end
    end

    def remove(value)
        parent(value).left.value==value ? parent(value).left=nil : parent(value).right=nil
    end


    def delete(value,node=@root)
        if node.value==value
            if !node.right && !node.left
                remove(node.value)
            elsif node.left
                replacement=biggest_node(node.left).value
                remove(biggest_node(node.left).value)
                node.value=replacement
            else
                node.value=node.right.value
                node.left=node.right.left
                node.right=node.right.right               
            end
        elsif node.value>value
            delete(value,node.left)
        else
            delete(value,node.right)
        end

        
    end

    def biggest_node(node)
        if !node.right
            node 
        else
            biggest_node(node.right)
        end
    end


    def parent(value,node=@root)
        if node.value>value
            node.left.value==value ? node : parent(value,node.left)
        elsif node.value<value
            node.right.value==value ? node : parent(value,node.right)
        else
            nil
        end
    end

    def children(node)
        return node.left,node.right
    end
        

    def level_order(node=@root,result=[],depth=0) 
        return result if node==nil
        result.append([]) if result.length==depth
        result[depth].append(node.value)
        level_order(node.left,result,depth+1)
        level_order(node.right,result,depth+1)          
    end

    def inorder(node=@root,result=[])
        return if node==nil
        inorder(node.left,result)
        result.append(node.value)
        inorder(node.right,result)
        result
    end

    def preorder(node=@root,result=[])
        return if node==nil
        result.append(node.value)
        preorder(node.left,result)
        preorder(node.right,result)
        result
    end

    def postorder(node=@root,result=[])
        return if node==nil
        postorder(node.left,result)
        postorder(node.right,result)
        result.append(node.value)
        result
    end

    def depth(node=@root)
        !level_order(node).empty? ? level_order(node).length-1 : 0
    end

    def balanced?(node=@root)
        (depth(node.left)-depth(node.right)).abs <= 1 ? true : false
    end

    def rebalance!(node=@root)
        @root=build_tree(inorder)
    end
                
end

#driver script

tree=Tree.new(Array.new(15) { rand (1..100)})
p tree
p tree.balanced?
tree.insert(105)
tree.insert(200)
tree.insert(325)
p tree.balanced?
tree.rebalance!
p tree
p tree.balanced?
p tree.level_order
p tree.inorder
p tree.preorder
p tree.postorder


