def substrings(str,arr)
    return arr.reduce(Hash.new(0)) do |op_hash, item|
      for word in str.downcase.split(" ")
        op_hash[item]+=1 if word.include?(item)
      end
      op_hash
    end
  end