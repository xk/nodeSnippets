#!/usr/bin/env ruby -wKU
# poeta.rb
#   juanfc 2010-04-14
# 

kCuantos= 5e3
kLength= 8192
$ctr= 0
now= Time.now

$words=<<END.downcase.split
Con diez cañones por banda viento en popa a toda vela
no corta el mar si no vuela un velero bergantín bajel
pirata llamado por su bravura el temido en todo el mar
conocido del uno al otro confín
END

def poema(length)
  r=""
  prev=""
  curr=""
  while r.length < length do
    curr=$words[rand($words.length)] until curr != prev
    r+= (prev=curr)+ " "
  end  
  $ctr+=1
  return r
end

while $ctr < kCuantos do
  poema(kLength)
end


puts(kCuantos.to_s + " poemas de "+ kLength.to_s+ " caracteres.");
puts((now=Time.now - now).to_s + " segundos.");
puts((kCuantos/now).to_s+ " poemas / segundo.");

