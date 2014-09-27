class Movie < ActiveRecord::Base
  
  def overall_opinion
    if self.score.to_i > 60
      return "Oh yeah, I loved " + self.title + "!"
    else
      return self.title + " was a piece of shit! I can't believe you like that movie!"
    end
  end
  
  def year_statement
    if self.score.to_i >= 90
      return "Easily the best movie of " + self.year.to_s
    elsif self.score.to_i > 60 && self.score.to_i < 90 
      return "One of the better movies of " + self.year.to_s
    else
      return "When did that come out, like " + self.year.to_s + "?"
    end
  end
  
  def actors_statement
    if self.score.to_i >= 90
      return self.actor_one + " did a great job as " + self.character_one
    elsif self.score.to_i >60 && self.score.to_i < 90
      return "I thought #{self.actor_one} and #{self.actor_two} were ok, but I would have preferred someone more dynamic."
    else
      return "Not one of the bright spots on #{self.actor_one}'s resume, though I'm sure that greedy fuck is sleeping ok at night."
    end
  end
  
  def director_statement
    if self.score.to_i >= 90
      return "Man, #{self.director} knows how to take the most intricate, gripping storylines and make them even more compelling."
    elsif self.score.to_i >60 && self.score.to_i < 90
      return "Generally, I'd say I'm a fan of #{self.director}."
    else
      return "I mean, #{self.director} needs to go back to film school. Or anywhere but the director's chair."
    end
  end
  
  def concensus_info
    if self.critics_concensus.nil?
      return "(Sorry, we couldn't find a critics' concensus on this one. Try changing the topic to a movie you know something about.)"
    else
      return "(The critics' concensus: #{self.critics_concensus})"
    end
  end
  
  def talking_points
    if self.year.nil?
      tp_string = self.title
    else
      tp_string = self.overall_opinion + "\n" + self.year_statement + "\n" +
        self.actors_statement + "\n" + self.director_statement + "\n\n" +
        self.concensus_info
    end
    
    return { talking_points: tp_string}
  end
  
end
