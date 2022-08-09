class Api::V1::ThreatsController < ApiController
  before_action :set_threat, only: %i[ show update destroy ]

  # GET /threats
  def index
    @threats = Threat.all

    render json: @threats
  end

  # GET /threats/1
  def show
    render json: @threat
  end

  # POST /threats
  def create
    @threat = Threat.new(threat_params)

    if @threat.save
      render json: @threat, status: :created
    else
      render json: @threat.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /threats/1
  def update
    if @threat.update(threat_params)
      render json: @threat
    else
      render json: @threat.errors, status: :unprocessable_entity
    end
  end

  # DELETE /threats/1
  def destroy
    @threat.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_threat
      @threat = Threat.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def threat_params
      params.require(:threat).permit(:name, :tier, :latitude, :longitude)
    end
end
