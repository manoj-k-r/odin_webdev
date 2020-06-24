require "date"
require "csv"
require 'google/apis/civicinfo_v2'
require 'erb'
puts "EventManager Initialized"
=begin
def clean_zip(zipcode)
    return zipcode.to_s.rjust(5,'0')[0..4]
end
def get_legs(zipcode)
    civic_info=Google::Apis::CivicinfoV2::CivicInfoService.new
    civic_info.key='AIzaSyClRzDqDh5MsXwnCWi0kOiiBivP6JsSyBw'
    begin
        return civic_info.representative_info_by_address(address: zipcode,levels: 'country', roles: ['legislatorUpperBody', 'legislatorLowerBody']).officials
    rescue
        return "Legislator not found"     
    end
end
form=File.read "letter_temp.erb"
erb_temp=ERB.new form
=end
contents=CSV.read "../event_attendees_full.csv", headers: true, header_converters: :symbol
hr_arr=Array.new
day_arr=Array.new
contents.each do |line|
=begin
    name=line[:first_name]
    legislators= get_legs(clean_zip(line[:zipcode]))
    personal_letter=erb_temp.result(binding)
    Dir.mkdir("output") unless Dir.exists? "output"
    filename= "output/thanks_#{name}.html"
    File.open(filename, 'w') do |file|
        file.puts personal_letter
    end
=end
    regd=line[:regdate]
    day_arr.append(Date.strptime(regd, '%m/%d/%y %H:%M').wday)
    hr_arr.append(regd.split(" ")[1].split(":")[0])    
end
hr_hash=hr_arr.reduce(Hash.new(0)) do |hash,hour|
    hash[hour]+=1
    hash
end

day_hash=day_arr.reduce(Hash.new(0)) do |hash,day|
    hash[day]+=1
    hash
end
p day_hash.sort_by {|k,v| -v}
p hr_hash.sort_by {|k,v| -v}