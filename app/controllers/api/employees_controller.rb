class Api::EmployeesController < ApplicationController
  before_action :set_employee, only: [:update, :destroy]

  def index
    render json: Employee.get_all_employees
    # SQL VERSION FOUND IN EMPLOYEE MODEL, ACTIVE RECORD BELOW
    # render json: Employee.all
  end

  def create
    if Employee.create_employee(employee_params)
      render json: Employee.last
    else
      render json: Employee.errors, status: 422
    end
    # SQL VERSION FOUND IN EMPLOYEE MODEL, ACTIVE RECORD BELOW
    # employee = Employee.new(employee_params)
    # if employee.save
    #   render json: employee
    # else
    #   render json: employee.errors, status: 422
    # end
  end

  def update
    # if Employee.update_employee(params[:id], employee_params )
    #   binding.pry
    #   render json: 
    # else
    #   render json: @employee.errors, status: 422
    # end

    # SQL VERSION FOUND IN EMPLOYEE MODEL, ACTIVE RECORD BELOW
    if @employee.update(employee_params)
      render json: @employee
    else
      render json: @employee.errors, status: 422
    end
  end

  def destroy
    Employee.remove_employee(params[:id])
    # SQL VERSION FOUND IN EMPLOYEE MODEL, ACTIVE RECORD BELOW
    # render json: @employee.destroy
  end
  
  private

  def set_employee
    @employee = Employee.find(params[:id])
  end

  def employee_params
    params.require(:employee).permit(:first_name, :last_name, :email, :phone)
  end

end
