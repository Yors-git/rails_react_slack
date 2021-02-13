require_relative '../app/models/prime.rb'
require_relative '../app/views/primes/prime.rb'
require_relative '../bot/commands/calculate.rb'

SlackRubyBot::Client.logger.level = Logger::WARN

class Bot < SlackRubyBot::Bot
  @id = 0

  def self.next_id
    @id = @id % 10 + 1
  end

  command 'say' do |client, data, match|
    Rails.cache.write next_id, { text: match['expression'] }
    client.say(channel: data.channel, text: match['expression'])
  end
end

# class PrimeBot < SlackRubyBot::Bot
#   help do
#     title 'Prime bot'
#     desc 'This bot will tell you all the prime numbers below the entered number'

#     command 'prime' do
#       desc 'Displays prime numbers'
#     end
#   end
# end


model_prime = PrimeNumber.new
view_prime = PrimeView.new
@controller_prime = PrimesController.new(model_prime, view_prime)
# @controller_prime.class.command_class.routes.each do |route|
#   warn route.inspect
# end