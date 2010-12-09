#!/usr/bin/env ruby1.9 -wKU
# 052-samedigits.rb
#   juanfc 2010-12-08
# http://projecteuler.net/index.php?section=problems&page=2
# 52.
# Find the smallest positive integer, x, such that 2x, 3x, 4x, 5x, and 6x,
# contain the same digits in some order.


def digitssort(n)
  return n.to_s.split(//).sort.join
end

x=1
begin
  if (digitssort(x)  == (s=digitssort(2*x))) and (s == (s=digitssort(3*x))) and (s == (s=digitssort(4*x))) and (s == (s=digitssort(5*x))) and (s ==    digitssort(6*x))
    puts x, 2*x, 3*x, 4*x, 5*x, 6*x
    exit 0
  end
  x+=1
end until false
