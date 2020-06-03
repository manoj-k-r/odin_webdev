#given an array of days gives an array of buy day and sell day with the highest profit
def stock_picker(arr)
    profits_hash=arr.reduce({}) do |op_hash, price| # get all combos with positive profits
        profit=arr[arr.index(price)...arr.length].max-price
        op_hash[profit]=[price,arr[arr.index(price)...arr.length].max]
        op_hash
    end
    def sell_after_buy(arr,combo) # ensures if two days with same price sell day is after buy day
        if arr.index(combo[0])>arr.index(combo[1])
            temp_arr=arr
            temp_arr[arr.index(combo[1])]=-1
            sell_after_buy(temp_arr,combo)
        else
            return [arr.index(combo[0]),arr.index(combo[1])]
        end
    end
    best_combo=profits_hash[profits_hash.keys.sort.last]
    return sell_after_buy(arr,best_combo)
end