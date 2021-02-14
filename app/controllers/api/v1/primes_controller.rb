class Api::V1::PrimesController < ApplicationController
  include Commands
  def index
    primes_arr = Rails.cache.read('primeNums')
    render json: primes_arr
  end

  def create
  end
end
