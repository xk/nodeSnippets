#/usr/bin/env ruby

if ARGV.count!=2
  puts "$0 filename REG_EXP"
  exit
end

ER = /#{ARGV[1]}/

c=0

File.open(ARGV[0]).grep(ER).each do |line|
c=c+1
end

puts c