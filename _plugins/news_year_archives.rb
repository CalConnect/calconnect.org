# frozen_string_literal: true

# Generator to create year archive pages for news
class NewsYearGenerator < Jekyll::Generator
  safe true

  def generate(site)
    # Get all unique years from posts
    return unless site.posts && site.posts.docs && site.posts.docs.any?

    years = site.posts.docs.map { |p| p.date.year }.uniq.sort

    years.each do |year|
      # Check if page already exists
      existing = site.pages.find { |p| p.url == "/news/#{year}/" }
      next if existing

      site.pages << NewsYearPage.new(site, year)
    end
  end
end

class NewsYearPage < Jekyll::Page
  def initialize(site, year)
    @site = site
    @base = site.source
    @dir  = "news/#{year}"
    @name = "index.html"

    process(@name)

    self.data = {
      "layout" => "news-year",
      "title" => "News Archive #{year}",
      "year" => year.to_s,
      "permalink" => "/news/#{year}/",
      "type" => "news"
    }

    self.content = ""
  end
end
