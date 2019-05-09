# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

Flashcard.create(
  [
    { term: 'Hobbit', definition: 'a member of an imaginary race similar to humans, of small size and with hairy feet, in stories by J. R. R. Tolkien' },
    { term: 'Cellular Respiration', definition: 'C6H12O2 + O2 => H20 + CO2 + Energy' },
    { term: 'Creativity', definition: 'the use of the imagination or original ideas, especially in the production of an artistic work' }
  ]
)
