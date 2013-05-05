require "webrick"

$port = 10080

server = WEBrick::HTTPServer.new({
	:DocumentRoot => "./",
	:BindAddress => "127.0.0.1",
	:Port => $port
})

trap("INT") do
	server.shutdown
end

server.mount_proc('/ok') do |req, res|
end
server.mount_proc('/ng') do |req, res|
	$error = "failed"
end

Thread.new do
	server.start
end

Dir.glob("*_test").each do |dir|
	res = `cd #{dir}; ../../stasc 2>&1`
	if File.exists?("#{dir}/index.html")
		if $? != 0
			puts "FAIL: #{dir} #{res}"
			break
		end
		$error = false
		`chromium-browser --temp-profile http://localhost:#{$port}/#{dir}/index.html`
		if $error
			puts "FAIL: #{dir} #{error}"
			break
		end
	else
		if $? == 0
			puts "FAIL: #{dir} #{res}"
			break
		end
	end
	print "PASS: #{dir}\n"
end

server.shutdown

