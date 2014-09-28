class TopicsController < ApplicationController
  
  def index
    @topic = Topic.find_by_title(params[:topic])

    if params[:topic] == "Movies"
      query = params[:query]
      @rtapi = Api::RTApi.new(query)
      @info = @rtapi.get_info
      if @info['title']
        @title = @info['title']
        @year = @info['year']
        @score = @info['ratings']['critics_score']
        @actor_one = @info['abridged_cast'][0]['name']
        @character_one = (@info['abridged_cast'][0]['characters'] ? 
          @info['abridged_cast'][0]['characters'][0] : "The main character")
        @actor_two = @info['abridged_cast'][1]['name']
        @character_two = (@info['abridged_cast'][1]['characters'] ?
          @info['abridged_cast'][1]['characters'][0] : "The other character")
        @concensus = @info['critics_concensus']
        @director = @info['abridged_directors'][0]['name']
        @genre = @info['genres'][0]
        @movie = Movie.new( title: @title, year: @year, score: @score,
        actor_one: @actor_one, character_one: @character_one, 
        actor_two: @actor_two, character_two: @character_two,
        critics_concensus: @concensus, director: @director, genre: @genre)
        @output = @movie.email_construction
      else
        @output = { talking_points: @info}
      end
      respond_to do |format|
        format.html
        format.json { render json: @output }
      end
      
    elsif params[:topic] == "Music"
      query = params[:query]
      @beatsapi = Api::BeatsApi.new(query)
      @info = @beatsapi.get_info
      if @info[0]['artist_display_name']
        @artist = Artist.new( name: @info[0]['artist_display_name'],
        top_album: @info[0]['title'],
        favorite_track: @info[0]['refs']['tracks'].sample['display'])
        @output = @artist.email_construction
      else
        @output = { talking_points: @info}
      end
      
      respond_to do |format|
        format.html
        format.json { render json: @output }
      end
    end



  end
  
  def show
    @topic = Topic.find_by_title(params[:topic])
    if params[:topic] == "  Movies"
      @rtapi = Api::RTApi.new(query)
      @summary = rtapi.get_summary()
      @summary
    elsif topic == "Sports"
      #code for sports api
    end
  end
  
  private
  
  def topics_params
    params.require(:topic).permit(:query)
  end
  
end

