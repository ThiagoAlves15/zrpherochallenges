module Api
  module V1
    class OccurrencesController < ApiController
      before_action :set_occurrence, only: %i[ update ]

      # GET /occurrences
      def index
        @occurrences = Occurrence.all

        render json: @occurrences, include: [:hero, :threat]
      end

      # POST /occurrences
      def create
        @occurrence = Occurrence.new(occurrence_params)

        if @occurrence.save
          render json: @occurrence, status: :created
        else
          render json: @occurrence.errors, status: :unprocessable_entity
        end
      end

      # PATCH/PUT /occurrences/1
      def update
        if @occurrence.update(occurrence_params)
          render json: @occurrence
        else
          render json: @occurrence.errors, status: :unprocessable_entity
        end
      end

      private
        # Use callbacks to share common setup or constraints between actions.
        def set_occurrence
          @occurrence = Occurrence.find(params[:id])
        end

        # Only allow a list of trusted parameters through.
        def occurrence_params
          params.require(:occurrence).permit(:hero_id, :threat_id, :resolved)
        end
    end
  end
end
