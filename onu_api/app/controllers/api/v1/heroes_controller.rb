class Api::V1::HeroesController < ApiController
  before_action :set_hero, only: %i[ show update destroy ]

  # GET /heroes
  def index
    @heroes = Hero.all

    render json: @heroes
  end

  # GET /available_heroes
  def available_heroes
    @heroes = Hero.available_heroes.all

    render json: @heroes
  end

  # GET /heroes/1
  def show
    render json: @hero
  end

  # POST /heroes
  def create
    @hero = Hero.new(hero_params)

    if @hero.save
      render json: @hero, status: :created
    else
      render json: @hero.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /heroes/1
  def update
    if @hero.update(hero_params)
      render json: @hero
    else
      render json: @hero.errors, status: :unprocessable_entity
    end
  end

  # DELETE /heroes/1
  def destroy
    if @hero.destroy
      @heroes = Hero.all

      render json: @heroes
    else
      render json: @hero.errors, status: :unprocessable_entity
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_hero
      @hero = Hero.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def hero_params
      params.require(:hero).permit(:name, :rank, :latitude, :longitude)
    end
end
