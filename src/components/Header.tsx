const Header = () => {
  return (
    <header className="py-4">
      <div className="flex items-center justify-between container mx-auto">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-purple-500"></div>
          <div className="">
            <h1 className="text-2xl font-bold mb-2">Headline Editor</h1>
            <p className="text-sm">Edit your headline with ease</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
