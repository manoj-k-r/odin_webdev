#sort an array using recursion
def merge_sort(array)
    def merge(a,b)
        op_len=a.length+b.length
        op_arr=[]
        for i in 0...op_len
            if a.any? && b.any?
                op_arr.append([a[0],b[0]].min)
                a[0]<b[0]? a.shift : b.shift
            elsif a.any?
                op_arr.append(a[0])
                a.shift
            elsif b.any?
                op_arr.append(b[0])
                b.shift
            end
        end
        return op_arr
    end
    if array.length==1
        return array
    else
        left= merge_sort(array[0...array.length/2])
        right= merge_sort(array[array.length/2...array.length])
        merge(left,right)
    end
end
            


        