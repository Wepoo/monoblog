unless User.exists?(email: 'admin@qwew.ts')
  admin = User.new(
      email: 'admin@qwew.ts',
      password: '12345678',
      password_confirmation: '12345678',
      role: 'admin'
    )
  admin.save
end

%w(student1@gmail.com student2@gmail.com student3@gmail.com student4@gmail.com student5@gmail.com student6@gmail.com student7@gmail.com student8@gmail.com student9@gmail.com student10@gmail.com).each do |email|
  unless User.exists?(email: email)
    user = User.new(
        email: email,
        password: '12345678',
        password_confirmation: '12345678'
    )
    user.save
  end
end

15.times do |tag|
  Rubric.create( title: Faker::Book.genre )
end

15.times do |i|
  post = Post.new()
  post.user_id =  Faker::Number.between(1, 11)
  post.title = Faker::Book.title
  post.body = Faker::Lorem.paragraphs(2)
  post.rubrics << Rubric.find(i+1)
  post.save
end

35.times do |i|
  comment = Comment.new()
  comment.user_id =  Faker::Number.between(1, 11)
  comment.body = Faker::Lorem.sentence
  comment.post_id = Faker::Number.between(1, 15)
  comment.save
end
