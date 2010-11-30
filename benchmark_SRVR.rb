#!/usr/bin/env ruby

require 'rubygems'
require 'eventmachine'

class RequestHandler < EM::P::HeaderAndContentProtocol
  
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
        r << (prev=curr)
    end

    return r.join(' ')
  end
  
  def receive_request headers, content
    unPoema= poema(4096)
    send_data("HTTP/1.1 200 OK\nContent-Length: #{unPoema.length}\nContent-Type: text/plain\nServer: RUBY\n\n#{unPoema}")
    close_connection_after_writing
  end
end

EM.run{
  port = 8080
  EM.start_server 'localhost', port, RequestHandler
  puts "RUBY Server running on port #{port}"
}

