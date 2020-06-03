def bubble_sort(arr)
  temp_arr=arr.dup
  for i in 0...temp_arr.length-1
    if temp_arr[i]>temp_arr[i+1]
      temp_arr[i], temp_arr[i+1]=temp_arr[i+1], temp_arr[i]
    end
  end
  if temp_arr==arr
    return temp_arr
  else
    bubble_sort(temp_arr)
  end
end

