require 'json'
require 'cgi'
require 'net/http'

module Api
  class BaseApi
    def initialize(topic)
      @topic = topic
      @api_file = 'lib/api.keys'
      load_api_keys
    end

    def get_info
    end

    def bullshit
      return "This is a huge pile of bullshit"
    end

    def load_api_keys
      file = File.open(@api_file, "r")
      data = file.read
      obj = JSON.parse(data)
      @apiKey = obj
    end
  end

  class RTApi < BaseApi
    @@search_url = "http://api.rottentomatoes.com/api/public/v1.0/%s.json?apikey=%s%s" #endpoint, apiKey, params
    @@info_url = "http://api.rottentomatoes.com/api/public/v1.0/movies/%s.json?apikey=%s"

    def get_info
      movie_id = search(@topic)
      if movie_id
        return info(movie_id)
      else
        return bullshit
      end
    end
    
    def bullshit
      "I really enjoyed the cinematography in that movie."
    end

    private

    def info(movie_id) #must be a valid movie_id! there are no checks!
      url = @@info_url % [movie_id, @apiKey["rtapi"]]
      resp = Net::HTTP.get_response(URI.parse(url))
      result = JSON.parse(resp.body)
      return result
    end

    def search(movie)
      params = "&q=" + CGI.escape(movie) + "&page_limit=1"
      url = @@search_url % ['movies.json', @apiKey["rtapi"], params]
      resp = Net::HTTP.get_response(URI.parse(url))
      result = JSON.parse(resp.body)
      if result["movies"].empty?
        return false
      else
        return result["movies"][0]["id"]
      end
    end
  end

  class BeatsApi < BaseApi
    @@search_url = "https://partner.api.beatsmusic.com/v1/api/%s?client_id=%s%s" #endpoint, params, client_id
    @@info_url = "https://partner.api.beatsmusic.com/v1/api/artists/%s/%s?client_id=%s" #artist_id, endpoint, client_id

    def get_info
      artist_id = search(@topic)
      if artist_id
        return info(artist_id)
      else
        return bullshit
      end
    end

    private

    def info(artist_id)
      url = @@info_url % [CGI.escape(artist_id), 'albums', @apiKey["beatsapi"]]
      resp = Net::HTTP.get_response(URI.parse(url))
      begin
        result = JSON.parse(resp.body)
        if result["data"].empty?
          result = false
        else
          result = result["data"][0..2]
        end
      rescue JSON::ParserError => e
        result = false
      return result
      end
    end

    def search(query) #start by searching for an artist
      params = "&q=" + CGI.escape(query) + "&type=artist"
      url = @@search_url % ['search', @apiKey["beatsapi"], params]
      resp = Net::HTTP.get_response(URI.parse(url))
      begin
        result = JSON.parse(resp.body)
        if result["data"].empty?
          result = false
        else
          result = result["data"][0]["id"]
        end
      rescue JSON::ParserError => e
        result = false
      return result
      end
    end
  end
end
