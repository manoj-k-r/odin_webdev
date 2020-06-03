#given a string and a shift convert all letters keeping punctuation
def caesar_cipher(str,shift)
  alpha_arr=Array.new
  for i in 97..122
    alpha_arr.push(i.chr)
  end
  op_arr=str.split("").map do |letter|
    if alpha_arr.include?letter.downcase #normal shift
      if letter==letter.downcase
          alpha_arr[(alpha_arr.index(letter.downcase)+shift)%26]
        else
          alpha_arr[(alpha_arr.index(letter.downcase)+shift)%26].upcase
      end
    else
      letter #punctuations
    end
  end
  return op_arr.join("")
end
    
  