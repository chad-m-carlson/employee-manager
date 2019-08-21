class Employee < ApplicationRecord

  def self.get_all_employees
    Employee.find_by_sql(["
      SELECT id, first_name, last_name, email, phone
      FROM employees
    "])
  end
end
