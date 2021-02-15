class CreatePrimesArrs < ActiveRecord::Migration[6.0]
  def change
    create_table :primes_arrs do |t|
      t.text :numbers, array: true, default: []

      t.timestamps
    end
  end
end
