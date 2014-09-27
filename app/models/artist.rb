class Artist < ActiveRecord::Base
  
  def artist_statement
    return "Yeah, I know #{self.name}."
  end

  def album_statement
    return "I loved #{self.top_album}"
  end
  
  def track_statement
    return "Remember that song, #{self.favorite_track}?"
  end
  
  def talking_points
    tp_string = self.artist_statement + "\n" + self.album_statement + "\n" +
      self.track_statement
    return { talking_points: tp_string }
  end
  
end
