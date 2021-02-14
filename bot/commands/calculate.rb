  module Commands
    class Calculate < SlackRubyBot::Commands::Base
      operator '='
      command 'calculate'

      def self.call(client, data, match)
        result = Dentaku::Calculator.new.evaluate(match[:expression]) if match.names.include?('expression')
        result = result.to_s if result
        if result && result.length > 0
          client.say(channel: data.channel, text: result)
        else
          client.say(channel: data.channel, text: 'Got nothing.')
        end
      rescue StandardError => e
        client.say(channel: data.channel, text: "Sorry, #{e.message}.")
      end
    end

    class CheckPrime < SlackRubyBot::Commands::Base
      operator 'p?'
      command 'isPrime?'

      def self.call(client, data, match)
        if (match[:expression]).to_i.prime?
          primes = Prime.each(match[:expression].to_i).to_a
          Rails.cache.write('primeNums', primes)
          client.say(channel: data.channel, text: "Primes lower than #{match['expression']} are #{primes}")
        else
          client.say(channel: data.channel, text: "#{match['expression']} is not a prime number")
        end
      end
    end
  end
