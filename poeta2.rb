#!/usr/bin/env ruby -KU
# poeta.rb
# juanfc 2010-04-14
#5000 poemas de 8192 caracteres.
#11.612755 segundos.
#430.561051188973 poemas / segundo.

kCuantos= 5e3.to_i
kLength= 8192
now= Time.now

$words='Con diez cañones por banda viento en popa a toda vela
no corta el mar si no vuela un velero bergantín bajel
pirata llamado por su bravura el temido en todo el mar
conocido del uno al otro confín'.downcase.split

$words_length = $words.length

def poema(length)
        r=[]
        prev=''
        curr=''
        l = 0

        while (l < length) do
           begin
             curr=$words[rand($words_length)]  
           end until (curr != prev)
           
            l = l + curr.length + 1
            r.push(prev=curr)
        end
        
        return r.join(' ')
end

kCuantos.times do
        poema(kLength)
end

puts(kCuantos.to_s + " poemas de "+ kLength.to_s+ " caracteres.");
puts((now=Time.now - now).to_s + " segundos.");
puts((kCuantos/now).to_s+ " poemas / segundo.");


