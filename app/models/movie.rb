class Movie < ActiveRecord::Base
  
  def overall_opinion
    if self.score.to_i >= 90
      return [
      "Oh yeah, I loved #{self.title}!",
      "Dude, #{self.title} was epic!", 
      "I would kill you if you didn't like #{self.title}"].sample
      
    elsif self.score.to_i < 90 && self.score.to_i >= 60
      return ["Yeah, #{self.title} was decent, not one of my favorites though.",
        "Oh yeah, I saw that, I'd say I was entertained.",
        "Yeah #{self.title} is good in that wait-til-its-on-netflix-or-download-a-torrent kinda way."].sample
    else
      return ["#{self.title} was a piece of shit! I can't believe you like that movie!",
      "Ugh, why are you talking about #{self.title}?",
      "Oh, you like #{self.title}? Do you also like being punched in the brain? Because that's what watching that movie is like."].sample
    end
  end
  
  def year_statement
    if self.score.to_i >= 90
      return ["Easily the best movie of " + self.year.to_s,
        "That movie was one of the best parts of #{self.year} for me.",
        "Even #{Time.now.year - self.year.to_i} years later, #{self.title} holds up."].sample
    elsif self.score.to_i >= 60 && self.score.to_i < 90 
      return "Middle of the pack for #{self.year} releases."
    else
      return ["That almost ruined #{self.year} for me. Actually, I think it did.",
        "When people ask me what I was doing in #{self.year}, I wish I could forget watching that movie."].sample
    end
  end
  
  def actors_statement
    if self.score.to_i >= 90
      return ["#{self.actor_one} did a great job as #{self.character_one}.",
        "Sometimes, I feel like I'm #{self.character_one}.",
        "If I was half as talented as #{self.actor_one} or #{self.actor_two}, well, I probably would have been in the movie."].sample
    elsif self.score.to_i >60 && self.score.to_i < 90
      return "I thought #{self.actor_one} and #{self.actor_two} were good, though I probably would have preferred someone more dynamic."
    else
      return "Not one of the bright spots on #{self.actor_one}'s resume, though I'm sure that greedy bastard is sleeping just fine at night."
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
      tp_string = "-#{self.overall_opinion}\n-#{self.year_statement}\n" +
        "-#{self.actors_statement}\n-#{self.director_statement}" + 
         (self.critics_concensus ? "\n-#{self.critics_concensus}" : '' )
    end
    
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
