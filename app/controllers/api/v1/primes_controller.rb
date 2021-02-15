class Api::V1::PrimesController < ApplicationController
  include Commands
  def index
    primes_arr = Rails.cache.read('primeNums')
    render json: primes_arr
  end

  def all
    arrays_arr = PrimesArr.all.order('created_at DESC')
    render json: arrays_arr
  end

  def create
    @numbers_arr = PrimesArr.new(numbers: [Rails.cache.read('primeNums')])
    respond_to do |format|
      if @numbers_arr.save
        format.html { redirect_to root_path, notice: 'Primes Array was successfully saved.' }
        format.json { render json: {'message': 'Array Saved!'} }
      else
        format.html { redirect_to root_path, notice: 'Primes Array already exists in DB.' }
        format.json { render json: @numbers_arr.errors, status: :unprocessable_entity }
      end
    end
  end
end
