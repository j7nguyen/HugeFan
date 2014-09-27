require 'open-uri'

class ProxyController < ApplicationController
  def index
    url = request.fullpath.split("/proxy?url=")[1]
    render :text => open(url).read
  end
end