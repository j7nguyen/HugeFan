class Artist < ActiveRecord::Base
  
  def artist_statement
    return ["Yeah, I know #{self.name}.",
      "I listend to #{self.name} before they were cool.",
      "Yeah, I dabble."].sample
  end

  def album_statement
    return ["I loved that album #{self.top_album}.",
      "I still remember when #{self.top_album} came out.",
      "#{self.top_album} is a classic!"].sample
  end
  
  def track_statement
    return ["Remember that song, #{self.favorite_track}?",
      "#{self.favorite_track} is one of my favorite songs.",
      "I'll never forget the first time I heard #{favorite_track}."].sample
  end
  
  def talking_points
    tp_string = self.artist_statement + "\n" + self.album_statement + "\n" +
      self.track_statement
    return tp_string
  end
  
  def email_construction
    greeting = ["Dear ", "Hey ", "Hi "].sample + %w(David John Melissa Julie Amanda Chris Danny Wendy Natasha 
      William Diana Suresh Stephanie Joseph Rachel Robert Allen Bill Steve Natalie 
      Natasha Priscilla Lisa Derek Raj Roger).sample + ","

      message = ["I just wanted to check in really quick on a few things.",
        "I was wondering if you could review something for me.",
        "Sorry to bug you but I need your input on this."].sample
        
    return {talking_points: greeting + "\n\n" + message + "\n\n" + self.talking_points + "\n\nThanks!"}
  end
  
end
