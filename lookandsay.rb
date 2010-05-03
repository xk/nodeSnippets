#!/usr/bin/env ruby -wKU
# lookandsay.rb
#   juanfc 2010-04-15
# 

class String
  def look_and_say
    gsub(/(.)\1*/){|s| "#{s.size}#{s[0,1]}"}
  end
end

s = '1'
resultados= [s]

timer= Time.now
(24).times {
  resultados.push(s = s.look_and_say)
}
timer= (Time.now- timer) * 1e3

p resultados.shift until resultados.length == 0
puts(timer.to_s + " milisegundos.")