require 'json'
require 'cgi'
require 'net/http'

module Api
    class Api

        def initialize(topic)
            @topic = topic
            @api_file = 'api.keys'
            load_api_keys()
        end

        def get_summary()
        end

        def load_api_keys()
            file = File.open(@api_file, "r")
            data = file.read
            obj = JSON.parse(data)
            @apiKey = obj
        end
    end

    class RTApi < Api

        @@search_url = "http://api.rottentomatoes.com/api/public/v1.0/%s.json?apikey=%s%s" #endpoint, apiKey, params
        @@info_url = "http://api.rottentomatoes.com/api/public/v1.0/movies/%s.json?apikey=%s"

        def get_summary()
            movie_id = search(@topic)
            if movie_id
              info(movie_id)
            else
              return "BULLSHIT BRO"
            end
        end

    private

        def info(movie_id) #must be a valid movie_id! there are no checks!
            url = @@info_url % [movie_id, @apiKey["rtapi"]]
            resp = Net::HTTP.get_response(URI.parse(url))
            result = JSON.parse(resp.body)
            return result["synopsis"]
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
end
