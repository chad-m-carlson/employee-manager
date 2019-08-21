class Api::EmployeesController < ApplicationController

  def index
    render json: Employee.get_all_employees
  end

  def update

  end

  def destroy
    employee = Employee.find(params[:id])
    render json: employee.destroy
  end
  
end
