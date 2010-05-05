#/usr/bin/env ruby

if ARGV.count!=2
	puts "$0 filename count"
	exit
end
count = ARGV[1].to_i


File.open(ARGV[0],'w') do |file|
	count.times do |i|
		pos1 = i*20
		pos2= pos1+200
		file.puts(">SEQ_NAME#{i.to_s}\t#{pos1}\t#{pos2}")
		file.puts("ACTG"*(i*2%1000));
	end
end

