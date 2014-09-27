class TopicsController < ApplicationController
  
  def index
    @topic = Topic.find_by_title(params[:topic])

    if params[:topic] == "Movies"
      query = params[:query]
      @rtapi = Api::RTApi.new(query)
      if @rtapi.get_info['title']
        @info = @rtapi.get_info
        @title = @info['title']
        @year = @info['year']
        @score = @info['ratings']['critics_score']
        @actor_one = @info['abridged_cast'][0]['name']
        @character_one = @info['abridged_cast'][0]['characters'][0]
        @actor_two = @info['abridged_cast'][1]['name']
        @character_two = @info['abridged_cast'][1]['characters'][0]
        @concensus = @info['critics_concensus']
        @director = @info['abridged_directors'][0]['name']
        @genre = @info['genres'][0]
        @movie = Movie.new( title: @title, year: @year, score: @score,
        actor_one: @actor_one, character_one: @character_one, 
        actor_two: @actor_two, character_two: @character_two,
        critics_concensus: @concensus, director: @director, genre: @genre)
      else
        @movie = Movie.new( title: "We couldn't find a movie with a title like that",
        score: "", actor_one: "", character_one: "", actor_two: "", character_two:"",
        critics_concensus: "", director: "", genre: "")
      end
    elsif params[:topic] == "Sports"
      @summary = "Some sports shit"
    end


    respond_to do |format|
      format.html
      format.json { render json: @movie.talking_points }
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

