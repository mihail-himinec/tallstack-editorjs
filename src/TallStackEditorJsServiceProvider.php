<?php

namespace TallStackEditorJs;

use Filament\Facades\Filament;
use Filament\Support\Facades\FilamentAsset;
use Spatie\LaravelPackageTools\Package;
use Spatie\LaravelPackageTools\PackageServiceProvider;

class TallStackEditorJsServiceProvider extends PackageServiceProvider
{
    public function configurePackage(Package $package): void
    {
        $package
            ->name('tallstack-editorjs')
            ->hasViews()
            ->hasConfigFile()
            ->hasAssets();
    }

    public function packageBooted()
    {
        if (class_exists( class: \Filament\FilamentServiceProvider::class)) {
            FilamentAsset::register([
                            Css::make(id: 'tallstack-editorjs', path: __DIR__ . '/../resources/build/css/editor.css'),
                            Js::make( id: 'tallstack-editorjs', path: __DIR__ . '/../resources/build/js/editor.js')
            ]);
        }
    }

    public function getScripts(): array
    {
        return [
            'tallstack-editorjs' => __DIR__ . '/../resources/build/js/editor.js',
        ];
    }

    public function getStyles(): array
    {
        return [
            'tallstack-editorjs' => __DIR__ . '/../resources/build/css/editor.css',
        ];
    }
}