#!/usr/bin/env ruby

require 'rubygems'
require 'eventmachine'

module Socket
  def receive_data data
    send_data("HTTP/1.1 200 OK\nContent-Length: 4\nServer: RUBY\n\nHOLA")
    close_connection_after_writing
  end
end

EM.run{
  port = 8080
  EM.start_server 'localhost', port, Socket
  puts "RUBY Server running on port #{port}"
}

