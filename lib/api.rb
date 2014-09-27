require 'json'

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
