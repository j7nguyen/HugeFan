require 'json'

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

        @@base_url = "http://api.rottentomatoes.com/api/public/v1.0/%s.json?apikey=%s%s" #endpoint, apiKey, params

        def get_summary()
            return "bullshit for now"
        end
    # private
    #     def search(movie)
    #         url = @@base_url % (@apiKey)
    #     end
    end
end
