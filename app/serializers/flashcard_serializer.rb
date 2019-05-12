class FlashcardSerializer
  include FastJsonapi::ObjectSerializer
  attributes :id, :term, :definition
end
  