class Api::EmployeesController < ApplicationController

  def index
    render json: Employee.get_all_employees
  end
end
