class FlashcardsController < ApplicationController
  skip_before_action :verify_authenticity_token
  before_action :set_resource, except: [:index, :new, :create]

  def index
    @flashcards = Flashcard.all
  end

  def show
  end

  def new
  end

  def create
    @flashcard = Flashcard.new(resource_params)
    if @flashcard.save
      render json: FlashcardSerializer.new(@flashcard).serialized_json, status: :created
    else
      render json: { message: "Failed to create flashcard. Details: #{@flashcard.errors.full_messages.join(', ')}" }, status: :internal_server_error
    end
  end

  def edit
  end

  def update
    if @flashcard.update(resource_params)
      render json: { message: 'Successfully update flashcard.' }, status: :ok
    else
      render json: { message: "Failed to update flashcard. Details: #{@flashcard.errors.full_messages.join(', ')}" }, status: :internal_server_error
    end
  end

  def destroy
    @flashcard.destroy
    head :no_content
  end

  private

  def set_resource
    @flashcard = Flashcard.find(params[:id])
  end

  def resource_params
    params.require(:flashcard).permit(:id, :term, :definition)
  end
end
