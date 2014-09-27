class TopicsController < ApplicationController
  
  def index
    @topic = Topic.find_by_title(params[:topic])
    respond_to do |format|
      format.html
      format.json { render json: @topic }
    end
    
    if params[:topic] == "Movies"
      @rtapi = Api::RTApi.new("Mission Impossible")
      @summary = @rtapi.get_summary()
      fail
    elsif params[:topic] == "Sports"
      @summary = "Some sports shit"
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

