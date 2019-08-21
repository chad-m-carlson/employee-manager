class Employee < ApplicationRecord

  def self.get_all_employees
    Employee.find_by_sql(["
      SELECT id, first_name, last_name, email, phone
      FROM employees
      ORDER BY employees.id
    "])
  end

  def self.create_employee(employee)
    Employee.find_by_sql(["
      INSERT INTO employees(first_name, last_name, email, phone, created_at, updated_at)
      VALUES (:first_name, :last_name, :email, :phone, :created_at, :updated_at)
    ",{
      first_name: employee[:first_name],
      last_name: employee[:last_name],
      email: employee[:email],
      phone: employee[:phone],
      created_at: DateTime.now,
      updated_at: DateTime.now
    }])
  end

  def self.update_employee(id, employee)
    Employee.find_by_sql(["
      UPDATE employees
      SET first_name = ? , 
          last_name = ? ,
          email = ? ,
          phone = ? ,
          updated_at = ?
      WHERE employees.id = ?
    ", employee[:first_name], employee[:last_name], employee[:email], employee[:phone], DateTime.now, id
    ])
  end

  def self.remove_employee(id)
    Employee.find_by_sql(["
      DELETE FROM employees
      WHERE employees.id = #{id}
    "])
  end
end
