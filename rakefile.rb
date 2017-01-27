
namespace :ng do

  DIRS = { app: {
            shared: :dir,
            components: :dir,
            "app.module.js": :file,
            "app.routes.js": :file },
           assets: {
            img: :dir,
            css: :dir,
            js: :dir,
            libs: :dir },
           "index.html": :file
  }

  desc "Generates scaffolding for Angular app"
  task :new do
    new_ng_app
  end

  def new_ng_app
    recursively_create_directories(DIRS)
  end

  def recursively_create_directories(directories, path = "")
    return unless directories.respond_to?(:keys)
    directories.each do |current, contents|
      full_path = path.empty? ? "#{current}" : "#{path}/#{current}"
      create_contents(full_path, contents)
      recursively_create_directories(contents, full_path)
    end
  end

  def create_contents(full_path, contents)
    has_contents = contents.respond_to?(:keys)
    if contents == :dir || has_contents
      create_directory(full_path, !has_contents)
    elsif contents == :file
      create_file(full_path)
    end
  end

  def create_directory(directory, empty)
    Dir.mkdir directory
    if empty
      File.new("#{directory}/.keep", "w")
    end
  end

  def create_file(file)
    File.new(file, "w")
  end

end
