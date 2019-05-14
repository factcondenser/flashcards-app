# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
user = User.create(email: 'user@example.com', password: 'password')
user.flashcards.create(
  [
    { term: 'hobbit', definition: 'a member of an imaginary race similar to humans, of small size and with hairy feet, in stories by J. R. R. Tolkien' },
    { term: 'cellular respiration', definition: 'C6H12O2 + O2 => H20 + CO2 + Energy' },
    { term: 'malapropism', definition: 'misuse of a word by confusion with one that sounds similar' },
    { term: 'Salesforce', definition: 'an American cloud-based software company headquartered in San Francisco, California' },
    { term: 'pabulum', definition: 'insipid intellectual nourishment' },
    { term: 'Web Push Notifications', definition: 'a powerful combination of the Notifications, Push, and Service Worker APIs; to be used with caution' },
    { term: 'embonpoint', definition: 'the bodily property of being well rounded' },
    { term: 'Sidekiq', definition: 'an open source job scheduler written in Ruby, originally authored by Mike Perham' },
    { term: 'MINASWAN', definition: 'initialism of "Matz is nice and so we are nice", a motto of the Ruby programming language community, in reference to the demeanor of Yukihiro Matsumoto (nicknamed Matz, born 1965), the Japanese computer scientist who designed the language' },
    { term: 'creativity', definition: 'the use of the imagination or original ideas, especially in the production of an artistic work' }
  ]
)
